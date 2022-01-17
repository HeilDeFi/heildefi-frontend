import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { fromWei, Units, Unit } from '@harmony-js/utils';
import { Contract } from '@harmony-js/contract';

import { useHarmony } from '../context/harmonyContext';

import { createDonationContract, getDonationContractFromConnector } from '../helpers/donateHelper';
import { getAddress } from '@harmony-js/crypto';

const donations = ['1', '10', '100', '1000',];

const Donate = () => {
	const [donationStored, setDonationStored] = useState('0');
	const { hmy, fetchBalance } = useHarmony();
	const [contract, setContract] = useState<Contract | null>(createDonationContract(hmy));
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
				const contract = await getDonationContractFromConnector(connector, library);
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
					to : getAddress('one1ral7grclum8aje8skxshy4n3pdw92ratnwx9mj').checksum,
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
			<Wrapper>
			<Subtitle>Wanna To join With US Build DAO </Subtitle>
			<Subtitle>"Feel Free To Grant" </Subtitle>
				Total Your Grants
				<TotalStaked>{donationStored} ONE</TotalStaked>
			</Wrapper>
			<FlexList>
				{donations.map((value, index) => (
					<Donation key={index} onClick={handleClick(value)}>
						{value} <span>ONE</span>
					</Donation>
				))}
			</FlexList>
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

const FlexList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0;
	list-style: none;
	margin-top: 40px;
	width: 100%;
	& > li {
		margin-right: 20px;
	}
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

export default Donate;