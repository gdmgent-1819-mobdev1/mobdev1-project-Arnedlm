// Pages
import HomeView from './pages/home';
import AboutView from './pages/about';
import FirebaseView from './pages/firebase-example';
import MapboxView from './pages/mapbox-example';
import SignupView from './pages/signup';
import StudentView from './pages/student';
import OwnerView from './pages/owner';

export default [
  { path: '/', view: HomeView },
  { path: '/about', view: AboutView },
  { path: '/firebase', view: FirebaseView },
  { path: '/mapbox', view: MapboxView },
  { path: '/signup', view: SignupView},
  { path: '/student', view: StudentView},
  { path: '/kotbaas', view: OwnerView},
];
