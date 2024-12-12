import { useZxing } from 'react-zxing';

type BarcodeScannerProps = {
	onScan: (isbn: string) => void;
};

const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
	const { ref } = useZxing({
		onDecodeResult(result) {
			onScan(result.getText());
		},
	});

	return (
		<video ref={ref}>
			<track kind="captions" />
		</video>
	);
};

export default BarcodeScanner;
