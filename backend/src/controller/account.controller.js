const CustomStatusCodeError = require('../errors/CustomStatusCodeError');
const userService = require('../services/user.service');

exports.getAccount = async (req, res, next) => {
    try {
        const { user } = req;
        const account = await userService.getOneUser(user.uid);

        res.status(200).json({
            success: true,
            message: 'Account retrieved successfully',
            data: {
                account: {
                    uid: account.uid,
                    ...account.toJson(),
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
        
exports.updateAccount = async (req, res, next) => {
    try {
        const { user } = req;
        const { country, phoneNumber, nickname } = req.body;
        if (!country || !phoneNumber || !nickname) {
            throw new CustomStatusCodeError('All fields are required', 400);
        }
        const account = await userService.getOneUser(user.uid);
        if (!account) {
            throw new CustomStatusCodeError('Account not found', 404);
        }

        account.country = country;
        account.phoneNumber = phoneNumber;
        account.nickname = nickname;

        const resp = await userService.updateUser(account);


        res.status(200).json({
            success: true,
            message: 'Account retrieved successfully',
            data: {
                account: {
                    uid: resp.uid,
                    ...resp.toJson(),
                }
            }
        });
    } catch (error) {
        next(error);
    }
};