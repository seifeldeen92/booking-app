### Booking Application Coding Challenge

- Display all time slots sorted by date and time. Grouped by date
- User can set a reservation for a any available time slots
- User can deselect a reservation slot
- Company can only have one reservation set at time by one user at given time
- Overlapping slots in other companies are blocked

### Prerequisite

- node 16.10.0
- yarn 1.7

### Install & Run

```
➜ cd server
➜ yarn install --frozen-lockfile
➜ yarn start
```

```
➜ cd client
➜ yarn install --frozen-lockfile
➜ yarn start
```

Server runs on http://localhost:8080 & Client runs on http://localhost:8081

To run **Cypress** e2e tests run `yarn test` in the client folder
