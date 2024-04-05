import { useAuth } from '@hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { authApi, UserI } from '@services';

type GuardType = 'authenticated' | 'canManageTeam' | 'canManageFarmer' | 'isMobile' | 'notAuthenticated';

type GuardT = {
    guards: GuardType[];
    target: React.ReactElement;
};

const guardHandles = {
    authenticated: (user: UserI | null) => {
        if (!user?.id) {
            return '/login';
        }
        return null;
    },
    canManageTeam: () => {
        return null;
    },
    canManageFarmer: () => {
        return null;
    },
    isMobile: () => {
        return null;
    },
    notAuthenticated: (user: UserI | null) => {
        if (user?.id) {
            return '/';
        }
        return null;
    },
};

function Guard({ target, guards }: GuardT): React.ReactElement {
    const { user } = useAuth();

    for (const guard of guards) {
        const redirectUrl = guardHandles[guard](user);

        if (redirectUrl) return <Navigate to={redirectUrl} />;
    }

    return target;
}

export default Guard;
