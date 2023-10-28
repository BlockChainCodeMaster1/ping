
export default function router (router, handle) {
    /** api **/
    router.get("/api/getPublicRelationshipLink/:address", require("../container/relationship.js").getPublicRelationshipLink);
    router.get("/api/getPrivateRelationshipLink/:address", require("../container/relationship.js").getPrivateRelationshipLink);
    router.post("/api/createPrivateRelationship", require("../container/relationship.js").createPrivateRelationship);
    router.post("/api/createPublicRelationship", require("../container/relationship.js").createPublicRelationship);
    router.get("/api/getAndUpdateIndex", require("../container/relationship.js").getAndUpdateIndex);
    router.get("/api/getPublicAccountByInviteCode/:inviteCode", require("../container/relationship.js").getPublicAccountByInviteCode);
    router.get("/api/getPrivateAccountByInviteCode/:inviteCode", require("../container/relationship.js").getPrivateAccountByInviteCode);

    
    // Default catch-all handler to allow Next.js to handle all other routes
    router.all("*", (req, res) => handle(req, res))
}