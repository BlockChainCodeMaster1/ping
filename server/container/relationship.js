import db from "../database/db.js";
import { nanoid } from 'nanoid';
const PUBLIC = db.PUBLIC;
const PRIVATE = db.PRIVATE;
const INDEX = db.INDEX;

export async function createPublicRelationship(req, res) {
    let { from, signature, type, range } = req.body;

    console.log("createPublicRelationship", !from , !signature , type != "" , range != "")

    if (!from || !signature || type != "" || range != "" ) {
        res.send({
        msg: "Incomplete parameter",
        code: 0,
        });
        return;
    }

    const alreadyCreate = await PUBLIC.findOne({
        where:{
            from: from
        }
    })

    if(alreadyCreate) {
        res.send({
            msg: "Already create!",
            inviteCode: alreadyCreate?.inviteCode,
            code: 1,
        });
        return
    }

    const ga = !!req.cookies._ga ? req.cookies._ga : "";
    const uuid = nanoid()
    console.log(uuid)

    const createInvite = await PUBLIC.create({
        from: from,
        signature: signature,
        date: String(new Date().getTime()),
        inviteCode: uuid,
        type: type,
        range: range,
        ga: ga,
        status: 0
    })

    if (createInvite) {
        res.send({
        msg: "Success",
        inviteCode: uuid,
        code: 1,
        });
    } else {
        res.send({
        msg: "Failure",
        code: 0,
        });
    }
}

export async function createPrivateRelationship(req, res) {
    let { from, signature, type, range } = req.body;

    if (!from || !signature || type != "" || range != "" ) {
        res.send({
        msg: "Incomplete parameter",
        code: 0,
        });
        return;
    }

    const alreadyCreate = await PRIVATE.findOne({
        where:{
            from: from
        }
    })

    if(alreadyCreate) {
        res.send({
            msg: "Already create!",
            inviteCode: alreadyCreate?.inviteCode,
            code: 1,
        });
        return
    }

    const ga = !!req.cookies._ga ? req.cookies._ga : "";
    const uuid = nanoid()
    console.log(uuid)

    const createInvite = await PRIVATE.create({
        from: from,
        signature: signature,
        date: String(new Date().getTime()),
        inviteCode: uuid,
        type: type,
        range: range,
        ga: ga,
        status: 0
    })

    if (createInvite) {
        res.send({
        msg: "Success",
        data: uuid,
        code: 1,
        });
    } else {
        res.send({
        msg: "Failure",
        code: 0,
        });
    }
}

export async function getPublicRelationshipLink(req, res) {
    const { address } = req.params;

    if (!address) {
        res.send({
        msg: "Incomplete parameter",
        code: 0,
        });
        return;
    }

    const account = await PUBLIC.findAll({
        where:{
            from: address
        }
    })

    if(account){
        res.send({
            msg: "Success",
            code: 1,
            data: account
        });
    }else {
        res.send({
            msg: "Can not create!",
            code: 1,
        });
    }

}

export async function getPrivateRelationshipLink(req, res) {
    const { address } = req.params;

    if (!address) {
        res.send({
        msg: "Incomplete parameter",
        code: 0,
        });
        return;
    }

    const account = await PRIVATE.findAll({
        where:{
            from: address
        }
    })

    if(account){
        res.send({
            msg: "Success",
            code: 1,
            data: account
        });
    }else {
        res.send({
            msg: "Can not create!",
            code: 1,
        });
    }

}

export async function getPublicAccountByInviteCode(req, res) {
    const { inviteCode } = req.params;

    if (!inviteCode) {
        res.send({
            msg: "Incomplete parameter",
            code: 0,
        });
        return;
    }

    const account = await PUBLIC.findOne({
        where:{
            inviteCode: inviteCode
        }
    })

    if(account){
        res.send({
            msg: "Success",
            code: 1,
            data: account
        });
    }else {
        res.send({
            msg: "Can not create!",
            code: 1,
        });
    }

}

export async function getPrivateAccountByInviteCode(req, res) {
    const { inviteCode } = req.params;

    if (!inviteCode) {
        res.send({
            msg: "Incomplete parameter",
            code: 0,
        });
        return;
    }

    const account = await PRIVATE.findOne({
        where:{
            inviteCode: inviteCode
        }
    })

    if(account){
        res.send({
            msg: "Success",
            code: 1,
            data: account
        });
    }else {
        res.send({
            msg: "Can not create!",
            code: 1,
        });
    }

}

export async function getAndUpdateIndex(req, res) {
    const index = await INDEX.findOne({
        where: {
            id : 1
        }
    })
    const update = await index.increment("index", {by: 2, where: {id: 1}});
    console.log("update", update)
    if(update){
        res.send({
            msg: "Success",
            index: update?.index,
            code: 1,
        });
    }else {
        res.send({
            msg: "Can not create!",
            code: 1,
        });
    }

}

