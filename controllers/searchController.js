const express = require('express')
const router = express.Router()
// custom middleware
const isClientAuth = require('../lib/isClientAuth')

// models
const Search = require('../models/search')
const Client = require('../models/client')


/* -- Search ROUTES -- */

// Create Search Route
router.post('/', isClientAuth, async (req, res, next) => {
	const createdSearch = await Search.create({
		// spread operator with req.body. In case that optional paths are given.
		...req.body,
		client: req.session.loggedInUser._id
	})
	console.log(createdSearch);

	res.status(200).json({
		data: createdSearch,
		message: "Successfully Created Search",
		status: 200
	})

})


// Search Index Route
router.get('/', async (req, res, next) => {
	
	if(req.session.isClient === true) {
		const searchList = await Search.find({ client: req.session.loggedInUser._id })//.populate('client')

		res.status(200).json({
			data: searchList,
			message: `Retrieved ${searchList.length} Found Searches`,
			status: 200
		})
	}

	/* Seperate Route for Realtor? */
	if(req.session.isClient === false && /*query for client here.*/currentRealtor[0].username === req.session.loggedInUser.username) {
		// 
		req.session.loggedInUser.clients.forEach((client, key) => {
			if(client._id === req.params.clientId) {

				updatedRealtor.clients.splice(key, 1)
				updatedRealtor.clientHistory.push(client)
			}
		})
	}


})
// Client and contracted Realtor needs a searchIndex
	// client can always view searchIndex, Client's Realtor can view the client's searchIndex
		// realtor: logic for Client id being in realtor's clients[] array.





module.exports = router