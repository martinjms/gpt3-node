const got = require("got")

module.exports = function (RED) {
	function Gpt3DialogNode(config) {
		RED.nodes.createNode(this, config)
		var node = this
		node.on("input", async (msg) => {
			const url = "https://api.openai.com/v1/engines/davinci/completions"
			const prompt = `${msg.chatLog}Human: ${msg.payload}\nAI:`
			const params = {
				prompt: prompt,
				max_tokens: 150,
				temperature: 0.9,
				frequency_penalty: 0,
				presence_penalty: 0.6,
				stop: "\nHuman",
			}
			const headers = {
				Authorization: `Bearer <GPT3 API KEY>`,
			}

			try {
				const response = await got
					.post(url, { json: params, headers: headers })
					.json()
				output = `${prompt}${response.choices[0].text}`
				return node.send({ payload: output, prompt })
			} catch (err) {
				return err
			}
		})
	}
	RED.nodes.registerType("gpt3-dialog", Gpt3DialogNode)
}
