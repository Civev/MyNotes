import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Heading,
	Text,
} from "@chakra-ui/react";
import propTypes from "prop-types"
import moment from "moment/moment"

export default function Note({ title, description, createdAt }) {
	
	return (
		<Card variant={"filled"}>
			<CardHeader>
				
				<Heading size={"md"}>{title}</Heading>
			</CardHeader>
			<Divider borderColor={"gray"} />
			<CardBody>
				<Text>{description}</Text>
			</CardBody>
			<Divider borderColor={"gray"} />
			<CardFooter>{moment(createdAt).format("DD/MM/YY h:mm:ss")}</CardFooter>
		</Card>
	);
}
Note.propTypes ={
title: propTypes.string,
description: propTypes.string,
createdAt: propTypes.string
}


