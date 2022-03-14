import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

/*
<Route path='/:coinId/*' element={<Coin />}></Route>
				<Route path='/' element={<Coins />}></Route>
*/
function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/tv' element={<Tv />}></Route>
				<Route path='/search' element={<Search />}></Route>
				<Route path='/' element={<Home />}>
					<Route path='/movies/:type/:movieId' element={<Home />}></Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
