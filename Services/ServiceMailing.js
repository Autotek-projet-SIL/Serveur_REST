const ModelFacture = require("../Models/ModelFacture");
const log = require("../config/Logger");
let sender = process.env.autotek_mail;
let app_pass = process.env.autotek_password;
let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: sender,
    pass: app_pass,
  },
});

// Fonctions du service mailing
const getFactureDetailByID = async (request, response) => {
  let facture_detail = await ModelFacture.getFactureDetailByID(
    request,
    response
  );
  let receiver = facture_detail.email;
  let prix =
    facture_detail.montant +
    (facture_detail.tva * facture_detail.montant) / 100;

  var mailOptions = {
    from: sender,
    to: receiver,
    subject: "Facture recapitulative de votre location avec Autotek",
    html: `<body><h1 style="font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase;  background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0;">Facture</h1>
        <span style="display: block; float: right;height: 10%; width:40%; position: relative;"><img style="width: 100%;display: block; float: right; margin-right: 15px;" alt="" src="https://firebasestorage.googleapis.com/v0/b/autotek-8c725.appspot.com/o/Mailing%2Flogo_autotek.png?alt=media&token=06ff3ebd-ee33-433e-9e85-7230562d0e09"></span>
        <div style="margin-left: 15px;"><h3 style="color:#000;">Locataire<br> ${facture_detail.nom} ${facture_detail.prenom}</h3><h3 style="color:#000;">Informations facture</h3>
        <p style="color:#000;">Num: ${facture_detail.id_facture}</p>
        <p style="color:#000;">Date: ${facture_detail.date_facture}</p>
        <p style="color:#000;">Heure: ${facture_detail.heure}</p></div>
        <br/><div style="text-align: center; color:#000;">
        <h3 style="color:#000; width:260px ; font-size: 25px; background-color: #9AD4E2; margin:0 auto; border-radius: 0.25em;">Prix total: ${prix} DA</h3>
        <h3 style="color:#000;">Informations sur le trajet</h3>
        <p style="color:#000;">Date: ${facture_detail.date_debut}</p>
        <p style="color:#000;">Heure: De ${facture_detail.heure_debut} a ${facture_detail.heure_fin}</p>
        <h3 style="color:#000;">Informations sur le vehicule</h3>
        <p style="color:#000;">Matricule: ${facture_detail.numero_chassis}</p>
        <p style="color:#000;">Marque et modele: ${facture_detail.marque} - ${facture_detail.modele}</p></div>
        <br/>  
        <h3 style="color:#000; text-align: center; border: none;width:80%; border-width: 1.5px; border-color: #999; border-top-style: solid; margin:0 auto">Merci de votre fidelité</h3>
        <br/></body>`,
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      response.sendStatus(500)
    } else {
      console.log("Email sent: " + info.response);
      response.sendStatus(200)
    }
  });
};

//Exporter les fonctions du service mailing
module.exports = {
  getFactureDetailByID,
};
