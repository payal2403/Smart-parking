import axios from "axios";

const baseUrl = "http://localhost:5001/apis/";
const Owner = "http://localhost:5001/owner/";
const user = "http://localhost:5001/users/";

class Apiservices {
  getToken() {
    const token = sessionStorage.getItem("token");

    const head = {
      Authorization: token,
    };

    return {headers:head}
  }

  login(data) {
    return axios.post(baseUrl + "Users/login", data);
  }

  // Category
  AddCategory(data) {
    return axios.post(baseUrl + "category/add", data,this.getToken());
  }
  ManageCategory(data) {
    return axios.post(baseUrl + "category/all", data,this.getToken());
  }
   DeleteCategory(data) {
    return axios.post(baseUrl + "category/deleteOne", data,this.getToken());
  }
   SoftDeleteCategory(data){
    return axios.post(baseUrl + "category/softDelete", data,this.getToken());
  }
  
  UpdateCategory(data){
    return axios.post(baseUrl + "category/UpdateCategory", data, this.getToken());
  }
   GetSingleCate(data){
    return axios.post(baseUrl + "category/single", data, this.getToken());
  }

    // Space
  
   AddSpace(data) {
    return axios.post(Owner + "parkingspace/add", data,this.getToken());
  } 
  
   ManageSpace(data) {
    return axios.post(Owner + "parkingspace/all", data,this.getToken());
  }
   DeleteSpace(data) {
    return axios.post(Owner + "parkingspace/deleteOne", data,this.getToken());
  }
    GetSinglespace(data){
    return axios.post(Owner + "parkingspace/single", data, this.getToken());
  }
    
  UpdateSpace(data){
    return axios.post(Owner + "parkingspace/Updatespace", data, this.getToken());
  }
   

  // Add Slots
   Addslots(data) {
    return axios.post(Owner + "parkingslots/add", data,this.getToken());
  }
  ManageSlot(data) {
    return axios.post(Owner + "parkingslots/all", data,this.getToken());
  }
   Deleteslot(data) {
    return axios.post(Owner + "parkingslots/deleteOne", data,this.getToken());
  }
   SoftDeleteSlot(data){
    return axios.post(Owner + "parkingslots/softDelete", data,this.getToken());
  }
   UpdateSlot(data){
    return axios.post(Owner + "parkingslots/UpdateSlots", data, this.getToken());
  }
    GetSingleslot(data){
    return axios.post(Owner + "parkingslots/single", data, this.getToken());
  }



  // Pricing
 Addprice(data){
  return axios.post(Owner + "pricing/add", data, this.getToken());
 }
 Manageprice(data) {
    return axios.post(Owner + "pricing/all", data,this.getToken());
  }
   Deleteprice(data) {
    return axios.post(Owner + "pricing/deleteOne", data,this.getToken());
  }
   SoftDeleteprice(data){
    return axios.post(Owner + "pricing/softDelete", data,this.getToken());
  }
   GetSingleprice(data){
    return axios.post(Owner + "pricing/single", data, this.getToken());
  }
   Updateprice(data){
    return axios.post(Owner + "pricing/Updatepricing", data, this.getToken());
  }

 
 


}
export default new Apiservices();
