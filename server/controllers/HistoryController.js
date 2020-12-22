const { History } = require("../models");

class HistoryController {
    static add(req, res, next) {
        const obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            quantity: req.body.quantity,
            UserId: req.loggedInUser.id
        }

        History.create(obj)
            .then((data) => {
                res.status(201).json(data);
            })
            .catch((err) => {
                next(err);
            });
    }

    static read(req, res, next) {
        History.findAll({
            where: {
              UserId: req.loggedInUser.id
            },
            order: [["updatedAt", "DESC"]],
        })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
               next(err);
            });
    }

    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            const result = await History.destroy({
                where: {
                    id
                }
            });
            res.status(200).json({ message: "Deleted from history" });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = HistoryController;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYwODE3MDU3OX0.ZY60r3QOeoq_RaJxRs1j70upDOAgpjzQbRMvVoWGkVA