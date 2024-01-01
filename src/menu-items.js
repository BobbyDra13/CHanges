// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  SpaceDashboardOutlinedIcon: SpaceDashboardOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  PeopleAltOutlinedIcon: PeopleAltOutlinedIcon,
  StoreMallDirectoryOutlinedIcon: StoreMallDirectoryOutlinedIcon,
  ContactMailOutlinedIcon: ContactMailOutlinedIcon,
  AssessmentOutlinedIcon: AssessmentOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'Overview',
      // caption: 'Dashboard',
      type: 'group',
      // icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'insights',
          title: 'Insights',
          type: 'item',
          icon: icons['SpaceDashboardOutlinedIcon'],
          url: '/'
        },
        {
          id: 'analysis',
          title: 'Analysis',
          type: 'item',
          icon: icons['AssessmentOutlinedIcon']
          // url: '/dashboard/default'
        }
      ]
    },
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   caption: 'Prebuild Pages',
    //   type: 'group',
    //   icon: icons['NavigationOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'sample-page',
    //       title: 'Sample Page',
    //       type: 'item',
    //       url: '/sample-page',
    //       icon: icons['ChromeReaderModeOutlinedIcon']
    //     },
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: icons['SecurityOutlinedIcon'],
    //       children: [
    //         {
    //           id: 'login-1',
    //           title: 'Login',
    //           type: 'item',
    //           url: '/application/login',
    //           target: true
    //         },
    //         {
    //           id: 'register',
    //           title: 'Register',
    //           type: 'item',
    //           url: '/application/register',
    //           target: true
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: 'utilities',
    //   title: 'Utilities',
    //   type: 'group',
    //   icon: icons['AccountTreeOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'util-icons',
    //       title: 'Icons',
    //       type: 'item',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       icon: icons['AppsOutlinedIcon'],
    //       external: true,
    //       target: true
    //     },
    //     {
    //       id: 'util-typography',
    //       title: 'Typography',
    //       type: 'item',
    //       url: '/utils/util-typography',
    //       icon: icons['FormatColorTextOutlinedIcon']
    //     }
    //   ]
    // },
    {
      id: 'utilities',
      title: 'Utilities',
      type: 'group',
      icon: icons['AccountTreeOutlinedIcon'],
      children: [
        {
          id: 'stores',
          title: 'Stores',
          type: 'item',
          // url: 'https://mui.com/material-ui/material-icons/',
          icon: icons['StoreMallDirectoryOutlinedIcon']
          // external: true,
          // target: true
        },
        {
          id: 'users',
          title: 'Users',
          type: 'item',
          // url: '/utils/util-typography',
          icon: icons['PeopleAltOutlinedIcon']
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      type: 'group',
      icon: icons['ContactSupportOutlinedIcon'],
      children: [
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          // url: 'https://codedthemes.gitbook.io/materially-react-material-documentation/',
          icon: icons['HelpOutlineOutlinedIcon'],
          chip: {
            label: 'Help?',
            color: 'primary'
          },
          external: true,
          target: true
        },
        {
          id: 'contact-us',
          title: 'Contact Us',
          type: 'item',
          url: '#',
          icon: icons['ContactMailOutlinedIcon']
          // disabled: true
        }
      ]
    }
  ]
};
