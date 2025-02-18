import { Router } from "express";

export const router = Router();

router
	.route("/info")
	.get((req, res) => {
		res.json({ method: "get" });
	})
	.post((req, res) => {
		res.json({ method: "post" });
	})
	.delete((req, res) => {
		res.json({ method: "delete" });
	});
