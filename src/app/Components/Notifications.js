import { Store } from "react-notifications-component";
export default function addNotification(title, message, type = "default", dismissDuration = 2000, autoSave = false) {
	return Store.addNotification({
		title,
		message,
		type,
		insert: "top",
		container: "bottom-right",
		animationIn: ["animate__animated", "animate__fadeIn"],
		animationOut: ["animate__animated", "animate__fadeOut"],
		dismiss: {
			duration: dismissDuration,
			onScreen: true,
			showIcon: true,
			touch: true,
		},
		slidingExit: {
			duration: 800,
			timingFunction: "ease-out",
			delay: 0,
		},
		touchSlidingExit: {
			swipe: {
				duration: 400,
				timingFunction: "ease-out",
				delay: 0,
			},
			fade: {
				duration: 400,
				timingFunction: "ease-out",
				delay: 0,
			},
		},
		onRemoval: () => {
			if (autoSave) {
				Store.addNotification({
					title: `All Files`,
					message: `Files saved successfully!`,
					type: "danger",
					insert: "top",
					container: "bottom-right",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					dismiss: {
						duration: 5000,
						onScreen: true,
						showIcon: true,
						touch: true,
					},
					slidingExit: {
						duration: 800,
						timingFunction: "ease-out",
						delay: 0,
					},
					touchSlidingExit: {
						swipe: {
							duration: 400,
							timingFunction: "ease-out",
							delay: 0,
						},
						fade: {
							duration: 400,
							timingFunction: "ease-out",
							delay: 0,
						},
					},
				});
			}
		},
	});
}
