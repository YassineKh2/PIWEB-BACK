const Sponsors = require('../models/Sponsors')
const Team = require('../models/team')

async function add(req,res){
    try{
    const sp=new Sponsors(req.body);
  await  sp.save();
    res.status(200).send('add');
    }catch(err){
        res.status(400).json({error:err});
    }
}
async function getall (req,res){
    try{
    const data =await Sponsors.find()
    res.send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}
async function getbyidsp(req,res){
    try{
    const data =await Sponsors.findById(req.params.id)
    res.status(200).send(data)
    }  catch(err){
        res.status(400).json({error:err});
    }


}
/*async function getbyteam(req, res) {
    try {
        let nameteam = req.params.nameteam;
        const data = await Sponsors.findOne({ name: nameteam }); // Corrected syntax
        if (!data) {
            return res.status(404).json({ error: "Sponsor not found" });
        }
        res.status(200).send(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
*/

async function updatesp(req, res) {
    try {
        const sponsorId = req.params.id;
        const { name, description, adresse, contact } = req.body;

        // Mettre à jour le sponsor avec les nouvelles valeurs
        const updatedSponsor = { name, description, adresse, contact }; // Créer un objet sponsor mis à jour

        // Mettre à jour le sponsor dans la collection Team
        const team = await Team.findOneAndUpdate(
            // Trouver le document Team qui a le sponsor à mettre à jour
            { "sponsors._id": sponsorId },
            // Mettre à jour le sponsor dans le champ sponsors de ce document
            { $set: { "sponsors.$": updatedSponsor } },
            // Options pour retourner le document mis à jour
            { new: true }
        );

        // Vérifier si le document Team a été mis à jour avec succès
        if (team) {
            // Répondre avec un statut 200 si le sponsor a été mis à jour dans le document Team
            res.status(200).send('Sponsor updated successfully in the team');
        } else {
            // Répondre avec un statut 404 si aucun document Team n'a été trouvé avec ce sponsor
            res.status(404).send('No teams found with this sponsor ID');
        }
    } catch (err) {
        // En cas d'erreur, répondre avec un statut 400 et renvoyer l'erreur
        res.status(400).json({ error: err.message });
    }
}



async function deletesp(req, res) {
    try {
        const sponsorId = req.params.id;

        // Rechercher le document Team qui contient le sponsor à supprimer
        const team = await Team.findOne({ "sponsors._id": sponsorId });

        if (team) {
            // Si le document Team est trouvé, supprimer le sponsor du tableau sponsors
            team.sponsors = team.sponsors.filter(sponsor => sponsor._id != sponsorId);
            await team.save();

            // Répondre avec un statut 200 si le sponsor est supprimé avec succès du document Team
            res.status(200).send('Sponsor deleted successfully from the team');
        } else {
            // Répondre avec un statut 404 si aucun document Team n'a été trouvé avec ce sponsor
            res.status(404).send('No teams found with this sponsor ID');
        }
    } catch (err) {
        // En cas d'erreur, répondre avec un statut 400 et renvoyer l'erreur
        res.status(400).json({ error: err.message });
    }
}

async function getbyname(req, res) {
    try {
        let name = req.params.name;
        const data = await Sponsors.findOne({ name }); 
        res.status(200).send(data);
    } catch (err) {
        res.status(400).json({ error: err });
    }
}


async function tridesc(req, res) {
    try {
        const data = await Sponsors.find().sort({ id: -1 }); // Tri descendant par date
        res.send(data);
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

async function triasc(req, res) {
    try {
        const data = await Sponsors.find().sort({ id: 1 }); // Tri ascendant par date
        res.send(data);
    } catch (err) {
        res.status(400).json({ error: err });
    }
}



module.exports={add,getall,getbyidsp,updatesp,deletesp,getbyname,triasc,tridesc}