import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

const BuyCrypto: React.FC = () => {
    const widget = new RampInstantSDK({
      hostAppName: 'Heil DeFi',
      hostLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Heil_defi_border_ramp_fiat_gateway.jpg',
      variant: 'auto'
    });
    widget.show();
  return (
    <section>
    </section>
  );
};

export default BuyCrypto;