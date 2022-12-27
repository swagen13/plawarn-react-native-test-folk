import { useEffect, useMemo, useState } from 'react';

export default function useUser() {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
  };

  const fullName = useMemo(() => {
    return `Mr. ${user.firstName} ${user.lastName}`;
  }, [user]);

  return { user, fullName };
}
