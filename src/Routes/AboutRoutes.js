import DiscoverMorePage from "../Pages/About/DiscoverMorePage";
import ReadMorePage from "../Pages/About/ReadMorePage";
import TimeZoneBrandsPage from "../Pages/About/TimeZoneBrandsPage";

export const AboutRoutes = [
    {
        path: '/about/read-more',
        element: <ReadMorePage />
    },
    {
        path: '/about/timezone-brands',
        element: <TimeZoneBrandsPage />
    },
    {
        path: '/about/discover-more',
        element: <DiscoverMorePage />
    }
]