import * as React from 'react';
import { StyledIcon } from './styles/general';

interface IconCoreProps {
  size?: keyof typeof widths;
  source: any;
}

interface IconProps {
  size?: keyof typeof widths;
}

const widths: {
  [key: string]: number;
} = {
  small: 16,
  medium: 20,
  mediumBig: 24,
  big: 40,
  huge: 56,
};

const Icon: React.SFC<IconCoreProps> = ({ size = 'big', source }) => (
  <StyledIcon source={source} width={widths[size]} height={widths[size]} />
);

export const ProfileHeartIcon: React.SFC<IconProps> = ({ size }) => (
  <Icon
    size={size}
    source={require('../../assets/icons/profil/valgorenhet.png')}
  />
);

export const ProfileFamilyIcon: React.SFC<IconProps> = ({ size }) => (
  <Icon
    size={size}
    source={require('../../assets/icons/profil/personlig_info.png')}
  />
);

export const ProfileLockIcon: React.SFC<IconProps> = ({ size }) => (
  <Icon
    size={size}
    source={require('../../assets/icons/profil/trygghetshojare.png')}
  />
);

export const ProfileBankAccountIcon: React.SFC<IconProps> = ({ size }) => (
  <Icon
    size={size}
    source={require('../../assets/icons/profil/bankkonto.png')}
  />
);

export const ProfileCertificateIcon = () => (
  <Icon source={require('assets/icons/profil/insurance-certificate.png')} />
);
