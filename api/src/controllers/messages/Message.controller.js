const Controller = require("../Controller");
const MessageService = require("../../services/messages/Message.service");
const MessagesValidator = require("../../validations/messages/Messages.validator");


class MessageController extends Controller {
	constructor() {
		super(MessagesValidator, MessageService);
		
	}

}

module.exports = new MessageController()