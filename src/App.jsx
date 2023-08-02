import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/creators/:id" element={<ViewCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/add" element={<AddCreator />} />
      </Routes>
    </Router>
  );
}

export default App;



// =======================================================
// import {useState} from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Menu, MenuItem, MenuList } from '@mui/material';
// import ShowCreators from './pages/ShowCreators';
// import ViewCreator from './pages/ViewCreator';
// import EditCreator from './pages/EditCreator';
// import AddCreator from './pages/AddCreator';

// function App() {
//   const [activeItem, setActiveItem] = useState('');

//   const handleItemClick = (event) => {
//     setActiveItem(event.target.value);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ShowCreators />} />
//         <Route path="/creators/:id" element={<ViewCreator />} />
//         <Route path="/edit/:id" element={<EditCreator />} />
//         <Route path="/add" element={<AddCreator />} />
//       </Routes>
//       <Menu
//         anchorEl={null}
//         open={true}
//         onClose={() => setActiveItem('')}
//         MenuListProps={{
//           style: {
//             borderRadius: 0,
//           },
//         }}
//       >
//         <MenuItem value="" onClick={handleItemClick}>
//           Home
//         </MenuItem>
//         <MenuItem value="/creators" onClick={handleItemClick}>
//           Creators
//         </MenuItem>
//         <MenuItem value="/edit" onClick={handleItemClick}>
//           Edit
//         </MenuItem>
//         <MenuItem value="/add" onClick={handleItemClick}>
//           Add
//         </MenuItem>
//       </Menu>
//     </Router>
//   );
// }

// export default App;