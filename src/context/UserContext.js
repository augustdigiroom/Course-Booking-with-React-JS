import React from 'react';

// Creates a context object where shared data will be stored
const UserContext = React.createContext();

// The provider component provides the context to other components
export const UserProvider = UserContext.Provider;

export default UserContext;