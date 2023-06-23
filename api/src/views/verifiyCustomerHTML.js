const header = require('./header')
const footer = require('./footer')

module.exports = (data) => {
	return `
		${header(data.header)}
			<div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
				<div>
					<h3>Hi ${data.body.username}, </h3>
					<p>${data.body.message}</p>
					<p>please login here 
						<a href="${process.env.SITE_URL}/login" style="padding: 5px 10px; margin-left: 10px; border-radius: 5px; box-shadow: 0px 3px 3px #3333; color:#fff; background-color: rgb(36, 57, 248);">
							login
						</a>
					</p>
				</div>
			</div>
		${footer()}
	`
}

