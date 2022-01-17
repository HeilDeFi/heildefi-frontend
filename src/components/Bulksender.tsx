import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@harmony-js/contract';
import { toBech32 } from '@harmony-js/crypto';
import { fromWei, Units, Unit } from '@harmony-js/utils';

import { useHarmony } from '../context/harmonyContext';

import { createBulkSenderContract, getBulkSenderContractFromConnector } from '../helpers/bulksenderHelper';
const bulksend = (amount: string, to: string) => {
	return {
		to: toBech32(to, 'one1'),
		value: amount,
		gasLimit: 210000,
		gasPrice: 3000000000,
		shardID: 0,
	};
};

const Bulksender = () => {
	const [receiverAddress, setReceiverAddress] = useState('');
	const [_fee, setFee] = useState('0');
	const { hmy, fetchBalance } = useHarmony();
	const [contract, setContract] = useState<Contract | null>(createBulkSenderContract(hmy));
	const { account, connector, library } = useWeb3React();

	const getReceiverAddress = async () => {
		if (contract) {
			try {
				const bulksend = await contract.methods.getReceiverAddress().call();
				const parsedAddress = toBech32(bulksend, 'one1');
				setReceiverAddress(parsedAddress);
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		getReceiverAddress();
	}, []);

	useEffect(() => {
		if (!account) {
			setContract(null);
		}
	}, [account]);

	useEffect(() => {
		if (connector) {
			(async () => {
				const contract = await getBulkSenderContractFromConnector(connector, library);
				setContract(contract);
			})();
		}
	}, [connector, setContract]);

	const handleClick = (value: string) => async () => {
		if (account && contract) {
			try {
				await contract.methods.bulksend().send({
					from: account,
					gasPrice: 3000000000,
					gasLimit: 210000,
					shardID: 0,
					to : getReceiverAddress,
					value: new Unit(value).asOne().toWei(),
					data: '0x',
				});
			} catch (error) {
				console.error(error);
			}
		} else {
			toast.error('Connect your wallet');
		}
	};

	return (
		<InfoContractComponent>
			<Wrapper>
			UNDER MAINTENANCE
			<Subtitle>Sorry if you see this, we're fixing the bug. "Come back later" </Subtitle>
			</Wrapper>
		</InfoContractComponent>
	);
};

const InfoContractComponent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50%;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -10vh;
	padding: 40px 60px;
	border-radius: 25px;
	width: 100%;
	background-color: white;
	box-shadow: 2px 8px 10px 4px rgba(0, 0, 0, 0.3);
	color: #a70000;
	font-size: 1.5rem;
`;

const Subtitle = styled.h2`
	font-size: 1rem;
	color: black;
	margin-bottom: 20px;
`;

const Donation = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(255, 255, 255, 0.7);
	color: black;
	padding: 20px 20px;
	border-radius: 10px;
	box-shadow: 1px 2px 4px 4px rgba(0, 0, 0, 0.2);
	font-size: 1.5rem;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: rgba(255, 255, 255, 1);
		cursor: pointer;
	}
	span {
		font-size: 1rem;
		margin-left: 8px;
		align-self: flex-end;
	}
`;

const TotalStaked = styled.div`
	font-size: 3.5rem;
	margin-top: 16px;
	color: black;
`;

export default Bulksender;