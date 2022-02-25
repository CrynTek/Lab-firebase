<template>
  <div class="about">
    <h1>วันที่</h1>
    <input v-model="date" type="date" />
    <h1>ชื่อ-นามสกุล</h1>
    <input v-model="name" type="text" />
    <h1>ผลตรวจ ATK</h1>
    <input v-model="atk" type="checkbox" />
    <h1>หมายเลขโทรศัพท์</h1>
    <input v-model="tel" type="text" />
    <h1>Email</h1>
    <input v-model="email" type="email" />
    <button @click="addData()">เพิ่มข้อมูล</button>
    <button @click="readData()">อ่านข้อมูล</button>
    <!-- <button @click="deleteDoc()">ลบข้อมูล</button> -->

    <!-- <h3>{{ csDoc }}</h3> -->

    <tbody>
      <tr>
        <th>Date</th>
        <th>Name</th>
        <th>ATK</th>
        <th>TEL.</th>
        <th>Email</th>
      </tr>
      <tr v-for="(data, index) in csDoc" :key="index">
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
          {{ data.date }}
        </td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
          {{ data.name }}
        </td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
          {{ data.atk }}
        </td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
          {{ data.tel }}
        </td>
        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px">
          {{ data.email }}
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore";
// import { doc, deleteDoc } from "firebase/firestore";
import db from "../plugins/firebaseInit";
export default {
  data() {
    return {
      csDoc: [],
      date: "",
      name: "",
      atk: false,
      tel: "",
      email: "",
    };
  },
  methods: {
    async addData() {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: this.name,
          date: this.date,
          atk: this.atk,
          tel: this.tel,
          email: this.email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async readData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        // this.csDoc.push(doc.data());
        this.csDoc.push(doc.data());
      });
    },
    // async deleteDoc() {
    //   await deleteDoc(doc(db, "users", ""));
    // },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
