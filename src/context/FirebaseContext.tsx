import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  collection, 
  query, 
  where,
  serverTimestamp
} from "firebase/firestore";
import { auth, db, googleProvider, handleFirestoreError, OperationType } from "../firebase";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  hairType: string;
  hairLength: string;
  createdAt: any;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: "pending" | "approved" | "visited";
  requestedAt: any;
}

interface FirebaseContextType {
  user: UserProfile | null;
  fbUser: FirebaseUser | null;
  loading: boolean;
  appointments: Appointment[];
  signUp: (email: string, password: string, name: string, hairType: string, hairLength: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  bookAppointment: () => Promise<void>;
  updateUserProfile: (name: string, hairType: string, hairLength: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // 1. Listen for standard Firebase Authentication states
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (authUser) => {
      setFbUser(authUser);
      if (!authUser) {
        // Clear state if logged out
        setUser(null);
        setAppointments([]);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // 2. Real-time synchronizers: user profile and user appointments
  useEffect(() => {
    if (!fbUser) return;

    setLoading(true);
    const userDocRef = doc(db, "users", fbUser.uid);

    // Profile listener
    const unsubscribeProfile = onSnapshot(
      userDocRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.data() as UserProfile);
        } else {
          // Fallback: if user exists in auth but not in Firestore yet, we can check details or wait
          // Google Auth may need creation right away:
          const email = fbUser.email || "";
          const name = fbUser.displayName || email.split("@")[0] || "Bestie Guest";
          
          const newProfile: UserProfile = {
            uid: fbUser.uid,
            name,
            email,
            hairType: "rizado", // Defaults
            hairLength: "largo",
            createdAt: serverTimestamp() // Use Firestore Server Timestamp
          };

          try {
            await setDoc(userDocRef, newProfile);
          } catch (error) {
            console.error("Error creating Google/missing profile in Firestore", error);
          }
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, `users/${fbUser.uid}`);
        setLoading(false);
      }
    );

    // Appointments listener (secure list query)
    const appointmentsQuery = query(
      collection(db, "appointments"),
      where("userId", "==", fbUser.uid)
    );

    const unsubscribeAppointments = onSnapshot(
      appointmentsQuery,
      (snapshot) => {
        const fetched: Appointment[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push(docSnap.data() as Appointment);
        });
        setAppointments(fetched);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "appointments");
      }
    );

    return () => {
      unsubscribeProfile();
      unsubscribeAppointments();
    };
  }, [fbUser]);

  // Sign Up using Email & Password
  const signUp = async (email: string, password: string, name: string, hairType: string, hairLength: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Immediately write user profile to database complying with security rules
      const path = `users/${newUser.uid}`;
      try {
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          name: name.trim(),
          email: email.trim(),
          hairType,
          hairLength,
          createdAt: serverTimestamp()
        });
      } catch (dbError) {
        handleFirestoreError(dbError, OperationType.CREATE, path);
      }
    } catch (authError) {
      console.error("Auth Sign Up Error:", authError);
      throw authError;
    }
  };

  // Sign In using Email & Password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Auth Sign In Error:", error);
      throw error;
    }
  };

  // Sign In using Google Popup Handler
  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Popup Auth Error:", error);
      throw error;
    }
  };

  // Logout Handler
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Auth Logout Error:", error);
    }
  };

  // Book showroom slot in physical atelier
  const bookAppointment = async () => {
    if (!fbUser || !user) {
      throw new Error("Debe estar registrada para agendar una invitación.");
    }

    const appointmentId = "appointment_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    const path = `appointments/${appointmentId}`;

    try {
      await setDoc(doc(db, "appointments", appointmentId), {
        id: appointmentId,
        userId: fbUser.uid,
        userName: user.name,
        userEmail: user.email,
        status: "pending",
        requestedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Update profile characteristics safely
  const updateUserProfile = async (name: string, hairType: string, hairLength: string) => {
    if (!fbUser || !user) return;
    const path = `users/${fbUser.uid}`;

    try {
      await setDoc(doc(db, "users", fbUser.uid), {
        name,
        hairType,
        hairLength,
        // Preserve unchangeable values to satisfy strict firestore rules updates
        uid: user.uid,
        email: user.email,
        createdAt: user.createdAt
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        fbUser,
        loading,
        appointments,
        signUp,
        signIn,
        signInGoogle,
        logout,
        bookAppointment,
        updateUserProfile
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
