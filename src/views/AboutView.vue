<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="addData()">เพิ่มข้อมูล</button>
    <button @click="readData()">อ่านข้อมูล</button>
    <button @click="deleteDoc()">ลบข้อมูล</button>

    <h3>{{ csDoc }}</h3>
    วันที่<input v-model="date" type="text" /> ชื่อ-นามสกุล<input
      v-model="name"
      type="text"
    />
    ผลตรวจ ATK<input v-model="atk" type="text" /> หมายเลขโทรศัพท์<input
      v-model="tel"
      type="text"
    />
    Email<input v-model="email" type="text" />
  </div>
</template>

<script>
import { collection, addDoc, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../plugins/firebaseInit";
export default {
  data() {
    return {
      csDoc: [],
      date: "",
      name: "",
      atk: "",
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
        this.csDoc.push({ id: doc.id, data: doc.data() });
      });
    },
    async deleteDoc() {
      await deleteDoc(doc(db, "users", ""));
    },
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
