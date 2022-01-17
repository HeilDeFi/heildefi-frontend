import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import Account from './components/Account';
import Balance from './components/Balance';
import Particles from 'react-tsparticles';
import particlesOptions from "./particles.json";
import { ISourceOptions } from "tsparticles";


import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Multisender from './pages/Multisender';
import Gotothefuture from './pages/Gotothefuture';
import LaunchPad from './pages/LaunchPad';
import BuyCrypto from './pages/BuyCrypto';
import Grants from './pages/Grants';


const App: React.FunctionComponent = () => {
	return (
		<div className="App">
			<Particles options={particlesOptions as ISourceOptions} />
			<Container>
			<Router>
				<Topbar className="App-topbar">
						<Sidebar />
				<Flex>
						<Balance />
						<Account />
					</Flex>
				</Topbar>
				<Content>
					<Routes>
						<Route path="*" element={<Home />} />
						<Route path="/launchpad" element={<LaunchPad />} />
						<Route path="/multisender" element={<Multisender />} />
						<Route path="/gotothefuture" element={<Gotothefuture />} />
						<Route path="/grants" element={<Grants />} />
						<Route path="/buycrypto" element={<BuyCrypto />} />
					</Routes>
				</Content>
				</Router>
			</Container>
			<ToastContainer
				position="bottom-right"
				newestOnTop={false}
				pauseOnFocusLoss={false}
				pauseOnHover={false}
				rtl={false}
			/>
		</div>
	);
};
const Flex = styled.div`
	display: flex;
	align-items: center;
`;

const Topbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 74px;
	width: 100%;
`;

const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 100%;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	padding: 0px 24px;
	max-width: 1200px;
	margin: 0 auto;
`;

export default App;
