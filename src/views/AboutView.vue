<template>
  <div class="mt-2">
    <div class="container-lg shadow p-3 mb-5 bg-body rounded ms-2">
      <div class="row justify-content-center mt-2">
        <div class="col-6">
          <h1>ชื่อ</h1>
          <input v-model="fname" type="text" />
        </div>
        <div class="col-6">
          <h1>นามสกุล</h1>
          <input v-model="lname" type="text" />
        </div>
      </div>
      <div class="form-group col-5">
        <label for="sel1">ผลการตรวจ ATK:</label>
        <select v-model="atk" class="form-control">
          <option>ยังไม่ได้ตรวจหาเชื้อ</option>
          <option>ผลเป็นบวก(ติดเชื้อ)</option>
          <option>ผลเป็นลบ(ไม่ติดเชื้อ)</option>
        </select>
      </div>
      <div class="mt-1">
        <h1>วันที่</h1>
        <input v-model="date" type="date" />
      </div>
      <div class="mt-1">
        <h1>หมายเลขโทรศัพท์</h1>
        <input v-model="tel" type="text" />
      </div>
      <div class="mt-1">
        <h1>Email</h1>
        <input v-model="email" type="email" />
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-center mt-2">
        <button @click="addData()" class="btn btn-outline-warning">
          บันทึกข้อมูล
        </button>

        <!-- <button @click="readData()" class="btn btn-outline-info">
          แสดงข้อมูล
        </button> -->
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">ATK</th>
          <th scope="col">TEL.</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody v-for="(data, index) in csDoc" :key="index">
        <tr>
          <th scope="row">{{ (index += 1) }}</th>
          <td>
            {{ data.date }}
          </td>
          <td>
            {{ data.fname }}
          </td>
          <td>
            {{ data.lname }}
          </td>
          <td>
            {{ data.atk }}
          </td>
          <td>
            {{ data.tel }}
          </td>
          <td>
            {{ data.email }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore";

import db from "../plugins/firebaseInit";
export default {
  data() {
    return {
      csDoc: [],
      date: "",
      fname: "",
      lname: "",
      atk: "",
      tel: "",
      email: "",
    };
  },
  mounted() {
    this.readData();
  },
  methods: {
    async addData() {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          fname: this.fname,
          lname: this.lname,
          date: this.date,
          atk: this.atk,
          tel: this.tel,
          email: this.email,
        });
        console.log("Document written with ID: ", docRef.id);
        this.readData();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async readData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        this.csDoc.push(doc.data());
      });
    },
  },
};
</script>

<style>
.container {
  margin: 10px 70px 70px;
  box-shadow: 0px 35px 30px rgb(0, 0, 0);
}
.form_wrapper {
  background: #fff;
  width: 400px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 25px;
  margin: 8% auto 0;
  position: relative;
  z-index: 1;
  border-top: 5px solid;
  -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
}
h1,
label {
  font-size: medium;
  color: #1f1d36;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
}
</style>
