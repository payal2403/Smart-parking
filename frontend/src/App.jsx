import { BrowserRouter, Route, Routes } from 'react-router-dom'



import Contact from "./components/Contact"
// import Home from "./components/Home"
import About from "./components/about"
// import Blog from "./components/View"
import FAQ from "./components/FAQ"
import Feature from "./components/Feature"
import Service from "./components/Service"
import Team from "./components/team"
import Testimonial from "./components/Testimonial"
import Login from "./components/Login"
   import { ToastContainer, Zoom } from 'react-toastify'
import Register from "./components/Register"
// import Test from "./components/test"
import AddCategory from "./components/Admin/AddCategory"
import AddSpace from "./components/Owner/Addspace"
import Managespace from "./components/Owner/ManageSpace"
import Updatespace from "./components/Owner/UpdateSpace"
import ManageCategory from "./components/Admin/ManageCategory"
import UpdateCategory from "./components/Admin/UpdateCategory"
import AdminDashboard from "./components/Admin/AdminDashboard"
import Master from './layout/Master'
import AdminMaster from './layout/adminlayout/Master'
import OwnerMaster from './layout/Ownerlayout/OwnerMaster'
import OwnerDashboard from './components/Owner/OwnerDashboard'
import View from './components/View'
import Viewslots from './components/viewslots'
// import addslot from './components/Owner/Addslots'
import Addslots from './components/Owner/Addslots'
import Manageslots from './components/Owner/Manageslot'
import Updateslots from './components/Owner/Updateslot'
import Addprice from './components/Owner/AddPricing'
import Manageprice from './components/Owner/ManagePricing'
import Updateprice from './components/Owner/Updatepricing'



const App = () => {
  return (
    <>


      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Master />}>
            <Route path='/contact' element={<Contact />} />
          {/* <Route path='/home' element={<Home />}/> */}
            <Route path='/about' element={<About />} />
            <Route path='/view' element={<View/>} />
            <Route path='/viewslots' element={<Viewslots/>} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='/Feature' element={<Feature />} />
            <Route path='/Service' element={<Service />} />
            <Route path='/Team' element={<Team />} />
            <Route path='/Testimonial' element={<Testimonial />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='test' element={<Test/>} />  */}
         

          </Route>
          {/* Admin */}
          <Route path='/admin' element={<AdminMaster/>}>
                <Route index element={<AdminDashboard/>}/>
                <Route path='/admin/addcategory' element={<AddCategory/>}/>
                <Route path='/admin/managecategory' element={<ManageCategory/>}/>
                <Route path='/admin/updatecategory/:_id' element={<UpdateCategory/>}/>

            </Route>

                       {/*  Owner*/}
                  
                         <Route path='/owner' element={<OwnerMaster/>}>
                         <Route index element={<OwnerDashboard/>}/>
                         <Route path='/owner/addspace' element={<AddSpace/>}/>
                         <Route path='/owner/managespace' element={<Managespace/>}/>
                         <Route path='/owner/updatespace/:_id' element={<Updatespace/>}/>
                         <Route path='/owner/addslots/' element={<Addslots/>}/>
                         <Route path='/owner/manageslots/' element={<Manageslots/>}/>
                         <Route path='/owner/updateslots/:_id' element={<Updateslots/>}/>
                         <Route path='/owner/addprice/' element={<Addprice/>}/>
                         <Route path='/owner/manageprice/' element={<Manageprice/>}/>
                         <Route path='/owner/updateprice/:_id' element={<Updateprice/>}/>
 
                       </Route>
            
        </Routes>

      </BrowserRouter>
         <ToastContainer />


    </>
  )



}

export default App;