# Security Specification for Locks By Danna

## 1. Data Invariants

- **User Profile Isolation**: A user's profile (/users/{userId}) is strictly confidential. Only the owner (the authenticated user whose UID matches `{userId}`) is allowed to write (`create`, `update`) and read (`get`) their own profile document. No other user can read or write to it.
- **Appointment Integrity**: Showroom appointments (/appointments/{appointmentId}) are locked. Users can create an appointment document, but the payload's `userId` must equal their authenticated UID, and the `userEmail` must equal their verified auth email. Users can read (`get` and `list`) only their own appointment documents.
- **Timestamp Integrity**: `createdAt` and `requestedAt` fields are validated using `request.time`. They are immutable and must match the exact time of transaction.
- **No Blanket Access**: There are no default public reads or writes allowed under the standard database structure.

## 2. The "Dirty Dozen" Payloads

1. **Spoofed User Registration**: Attempting to create a user profile under a `{userId}` that is different from `request.auth.uid`. (Blocked by isOwner)
2. **Read Someone's Profile**: Attempting to perform a `get` on a profile of another user UID. (Blocked by isOwner)
3. **Impersonate Appointment Creator**: Submitting an appointment where `userId` is set to "user-B" but authenticated as "user-A". (Blocked by validation helper)
4. **Junk Value in Hair Type**: Attempting to set `hairType` in user profile to a 5MB string "super_hair_infinite...". (Blocked by size constraint and exact value check)
5. **No Auth Appointment Purchase**: Creating an appointment anonymously/unauthenticated. (Blocked by isSignedIn)
6. **Injecting Arbitrary Fields**: Updating a user profile with dynamic keys like `isAdmin: true` or `discountCode: "FREE"`. (Blocked by validation map shape and `affectedKeys().hasOnly()`)
7. **Modifying Immortal Fields**: Attempting to update `createdAt` or `email` after a profile creation. (Blocked by update immutability rules)
8. **Malicious ID Poisoning**: Creating an appointment with a document ID of 500 characters and special escape codes. (Blocked by isValidId)
9. **List All Appointments**: Attempting to list all showroom appointments in the database without filtering by `userId`. (Blocked by query enforcer rule)
10. **Bypass State Machine**: Forcing an appointment's status to "approved" on creation. (Blocked by default "pending" status enforcement)
11. **Client-Provided Timestamps**: Submitting a client-derived high-precision timestamp for `createdAt`. (Blocked by `request.time` server verification)
12. **Anonymous Privilege Escalation**: Setting profile `email_verified` fields to false but attempting to bypass write protections anyway. (Blocked by verified email requirements)

## 3. Test Cases Draft

All the situations above will fail with `PERMISSION_DENIED` since we construct explicit security rules adhering to the strict Zero-Trust model.
