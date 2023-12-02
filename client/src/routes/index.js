import Dashboard from "../pages/protected/Dashboard"
import WeeklyUpdate from "../pages/protected/whats-up-madani/WeeklyUpdate"
import EventCalendar from "../pages/protected/whats-up-madani/EventCalendar"
import SopKeuangan from "../pages/protected/sop-and-guidelines/SopKeuangan"
import SopKomunikasi from "../pages/protected/sop-and-guidelines/SopKomunikasi"
import SopHRGA from "../pages/protected/sop-and-guidelines/SopHRGA"
import HutanDanIklim from "../pages/protected/program/HutanDanIklim"
import KomoditasBerkelanjutan from "../pages/protected/program/KomoditasBerkelanjutan"
import PembangunanHijau from "../pages/protected/program/PembangunanHijau"
import Bioenergi from "../pages/protected/program/Bioenergi"
import RencanaStrategis from "../pages/protected/knowledge-center/RencanaStrategis"
import PublikasiInternal from "../pages/protected/knowledge-center/PublikasiInternal"
import MateriLiterasi from "../pages/protected/knowledge-center/MateriLiterasi"
import PeraturanDanRegulasi from "../pages/protected/knowledge-center/PeraturanDanRegulasi"
import DatabaseTabular from "../pages/protected/knowledge-center/DatabaseTabular"
import DatabaseSpasial from "../pages/protected/knowledge-center/DatabaseSpasial"
import SiaranPers from "../pages/protected/knowledge-center/SiaranPers"
import Infografik from "../pages/protected/knowledge-center/Infografik"
import MediaMonitoring from "../pages/protected/knowledge-center/MediaMonitoring"
import CatatanRapatEksternal from "../pages/protected/knowledge-center/CatatanRapatEksternal"
import AssetDigital from "../pages/protected/knowledge-center/AssetDigital"
import DirektoriKontak from "../pages/protected/knowledge-center/DirektoriKontak"
import MediaCoverage from "../pages/protected/knowledge-center/MediaCoverage"
import LaporanSosmed from "../pages/protected/knowledge-center/LaporanSosmed"
import CreateReport from "../pages/protected/CreateReport"
import CreateContact from "../pages/protected/CreateContact"
import EditReport from "../pages/protected/EditReport"
import EditContact from "../pages/protected/EditContact"
import Reports from "../pages/protected/Reports"
import Profile from "../pages/protected/Profile"
import Documentation from "../pages/protected/Documentation"
import Users from "../pages/protected/Users"
import CreateUser from "../pages/protected/CreateUser"
import EditUser from "../pages/protected/EditUser"
import Admins from "../pages/protected/Admins"
import CreateAdmin from "../pages/protected/CreateAdmin"
import EditAdmin from "../pages/protected/EditAdmin"
import Tags from "../pages/protected/Tags"

const routes = [
  {
    path: '/',
    component: Dashboard,
  },
  {
    path: '/weekly-update',
    component: WeeklyUpdate,
  },
  {
    path: '/event-calendar',
    component: EventCalendar,
  },
  {
    path: '/sop-keuangan',
    component: SopKeuangan,
  },
  {
    path: '/sop-komunikasi',
    component: SopKomunikasi,
  },
  {
    path: '/sop-hrga',
    component: SopHRGA,
  },
  {
    path: '/hutan-dan-iklim',
    component: HutanDanIklim,
  },
  {
    path: '/komoditas-berkelanjutan',
    component: KomoditasBerkelanjutan,
  },
  {
    path: '/pembangunan-hijau',
    component: PembangunanHijau,
  },
  {
    path: '/bioenergi',
    component: Bioenergi,
  },
  {
    path: '/rencana-strategis',
    component: RencanaStrategis,
  },
  {
    path: '/publikasi-internal',
    component: PublikasiInternal,
  },
  {
    path: '/materi-literasi',
    component: MateriLiterasi,
  },
  {
    path: '/peraturan-dan-regulasi',
    component: PeraturanDanRegulasi,
  },
  {
    path: '/db-tabular',
    component: DatabaseTabular,
  },
  {
    path: '/db-spasial',
    component: DatabaseSpasial,
  },
  {
    path: '/siaran-pers',
    component: SiaranPers,
  },
  {
    path: '/infografik',
    component: Infografik,
  },
  {
    path: '/media-monitoring',
    component: MediaMonitoring,
  },
  {
    path: '/catatan-rapat-eksternal',
    component: CatatanRapatEksternal,
  },
  {
    path: '/asset-digital',
    component: AssetDigital,
  },
  {
    path: '/direktori-kontak',
    component: DirektoriKontak,
  },
  {
    path: '/media-coverage',
    component: MediaCoverage,
  },
  {
    path: '/laporan-sosmed',
    component: LaporanSosmed,
  },
  {
    path: '/create-report',
    component: CreateReport,
  },
  {
    path: '/edit/:id',
    component: EditReport,
  },
  {
    path: '/create-contact',
    component: CreateContact
  },
  {
    path: '/edit-contact/:id',
    component: EditContact,
  },
  {
    path: '/reports',
    component: Reports,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/documentation',
    component: Documentation,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/create-user',
    component: CreateUser,
  },
  {
    path: '/edit-user/:id',
    component: EditUser,
  },
  {
    path: '/admins',
    component: Admins,
  },
  {
    path: '/create-admin',
    component: CreateAdmin,
  },
  {
    path: '/edit-admin/:id',
    component: EditAdmin,
  },
  {
    path: '/tags',
    component: Tags,
  },
  
]

export default routes