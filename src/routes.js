// Pages
import HomeView from './pages/home';
import AboutView from './pages/about';
import FirebaseView from './pages/firebase-example';
import MapboxView from './pages/mapbox-example';
import SignupView from './pages/signup';
import StudentView from './pages/student';
import OwnerView from './pages/owner';
import SearchView from './pages/search';
import DetailView from './pages/detail';

export default [
  { path: '/', view: HomeView },
  { path: '/about', view: AboutView },
  { path: '/lijst', view: FirebaseView },
  { path: '/map', view: MapboxView },
  { path: '/signup', view: SignupView},
  { path: '/student', view: StudentView},
  { path: '/kotbaas', view: OwnerView},
  { path: '/zoeken', view: SearchView},
  { path: '/detail', view: DetailView}
];
