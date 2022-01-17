import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@harmony-js/contract';
import {  fromWei, Units, Unit } from '@harmony-js/utils';

import { useHarmony } from '../context/harmonyContext';

import { createBulkSenderContract, getBulkSenderContractFromConnector } from '../helpers/bulksenderHelper';


const Bulksender = () => {
	const [, setDonationStored] = useState('0');
	const { hmy, fetchBalance } = useHarmony();
	const [contract, setContract] = useState<Contract | null>(createBulkSenderContract(hmy));
	const { account, connector, library } = useWeb3React();

	const getDonationStored = async () => {
		if (contract) {
			try {
				const donations = await contract.methods.getDonationStored().call();
				const parsedDonations = fromWei(donations, Units.one);
				setDonationStored(parsedDonations);
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		getDonationStored();
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
				await contract.methods.addDonation().send({
					from: account,
					gasPrice: 3000000000,
					gasLimit: 210000,
					shardID: 0,
					value: new Unit(value).asOne().toWei(),
					data: '0x',
				});
				toast.success('Transaction done, Thanks for your donate ', {
					onClose: async () => {
						await fetchBalance(account);
						getDonationStored();
					},
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
			<Wrapper> {handleClick}
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


export default Bulksender;