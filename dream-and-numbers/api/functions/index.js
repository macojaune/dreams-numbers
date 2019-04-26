const functions = require("firebase-functions")
const admin = require("firebase-admin")
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey("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")

admin.initializeApp()
const db = admin.database()

const express = require("express")
const cors = require("cors")


const app = express()
app.use(cors())

app.post("/submit", async (req, res) => {
  const q = req.body
  try {
    if (q.user.name !== "" && q.user.email !== "" && q.user.dream !== "") {
      let demand = await db.ref("/Demands/").push(q.user)
      let uid = demand.key
      
      return res.status(201).json({uid})
    } else return res.error()
  } catch (e) {
    console.error(new Error(e.message))
    return res.sendStatus(500)
  }
})

app.post("/payed", async (req, res) => {
  const q = req.body
  try {
    if (q.uid !== "" && q.id !== "") {
      const demandRef = await db.ref(`/Demands/${q.uid}`).once("value")
      if (demandRef.exists()) {
        const demand = demandRef.val()
        await demandRef.set({paypalID: q.id})
        //
        const msg = {
          to: "test@marvinl.com",
          from: "contact@marvinl.com",
          subject: "[Dreams] Nouvelle Demande",
          html: "<p>email: " + demand.email + "</p>" +
            "<p>nom: " + demand.name + "</p>" +
            "<p>dream:" + demand.dream + "</p>"
        }
        let sent = await sgMail.send(msg)
        return res.status(201)
      }
    }
    return res.error()
  } catch (e) {
    console.error(new Error(e.message))
    return res.sendStatus(500)
  }
})

exports.api = functions.https.onRequest(app)
