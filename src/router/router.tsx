import { DashboardSection } from '@features/dashboard';
import { PhotosSection } from '@features/photos';
import { HomePage, LoginPage } from '@pages';
import { Guard } from '@utils';
import { Navigate, Route, Routes } from 'react-router-dom';

/**
 * Main Router
 */
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Guard target={<HomePage />} guards={['authenticated']} />}>
                <Route index element={<DashboardSection />} />
                <Route path="photos" element={<PhotosSection />} />
            </Route>
            <Route path="login" element={<Guard target={<LoginPage />} guards={['notAuthenticated']} />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default Router;
