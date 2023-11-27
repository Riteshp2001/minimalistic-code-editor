import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const router = useRouter();
    const [showLogin, setShowLogin] = useState(false);
    const [error, setError] = useState("");

	const handleButtonClick = () => {
		setShowLogin(true);
	};

	const handleCloseClick = () => {
        setShowLogin(false);
        setError("");
	};

	const handleLoginClick = async (event) => {
		const username = event.target.username.value;
		const email = event.target.email.value;
		const password = event.target.password.value;

		try {
			const response = await fetch("/api/submitForm", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}

			const data = await response.json();
			// Redirect or handle successful login
			router.push(`/signin?userId=${data.userId}`);
			setShowLogin(false);
		} catch (error) {
			setError(error.message); // Set error message for display
		}
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={handleButtonClick}
				className="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Click me
			</button>
			{showLogin && (
				<section className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
					<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full ">
						<a
							href="#"
							className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
						>
							<Image
								className="mr-2"
								src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
								alt="logo"
								width={32}
								height={32}
							/>
							Minimalistic
						</a>
						<div className="realtive w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
							<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
								<div className="flex justify-between">
									<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
										Sign in to your account
									</h1>
									<span
										className="text-blue-300 font-bold text-xl cursor-pointer hover:text-blue-600"
										onClick={handleCloseClick}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="32"
											viewBox="0 -960 960 960"
											width="32"
											className="fill-current text-formColors-500 transition-all duration-300 hover:text-blue-600 "
										>
											<path d="m338-290 142-142 142 142 48-48-142-142 142-142-48-48-142 142-142-142-48 48 142 142-142 142 48 48ZM479.679-59q-86.319 0-163.646-32.604-77.328-32.603-134.577-89.852-57.249-57.249-89.852-134.57Q59-393.346 59-479.862q0-87.41 32.662-164.275 32.663-76.865 90.203-134.412 57.54-57.547 134.411-90.499Q393.147-902 479.336-902q87.55 0 164.885 32.858 77.334 32.858 134.56 90.257 57.225 57.399 90.222 134.514Q902-567.257 902-479.458q0 86.734-32.952 163.382-32.952 76.648-90.499 134.2-57.547 57.551-134.421 90.214Q567.255-59 479.679-59Zm.092-91q136.742 0 233.485-96.387Q810-342.773 810-479.771q0-136.742-96.515-233.485Q616.971-810 479.729-810q-136.242 0-232.985 96.515Q150-616.971 150-479.729q0 136.242 96.387 232.985Q342.773-150 479.771-150ZM480-480Z" />
										</svg>
									</span>
								</div>
								<form className="space-y-4 md:space-y-6" action="/signin" onSubmit={handleLoginClick}>
									<div>
										<label
											for="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Username
										</label>
										<input
											type="text"
											name="username"
											id="user"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-formColors-600 focus:border-formColors-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="some Funky Name"
											required=""
										/>
									</div>
									<div>
										<label
											for="email"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Your email
										</label>
										<input
											type="email"
											name="email"
											id="email"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-formColors-600 focus:border-formColors-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@somemail.com"
											required=""
										/>
									</div>
									<div>
										<label
											for="password"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Password
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="••••••••"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-formColors-600 focus:border-formColors-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-start">
											<div className="flex items-center h-5">
												<input
													id="remember"
													aria-describedby="remember"
													type="checkbox"
													className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-formColors-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-formColors-600 dark:ring-offset-gray-800"
													required=""
												/>
											</div>
											<div className="ml-3 text-sm">
												<label for="remember" className="text-gray-500 dark:text-gray-300">
													Remember me
												</label>
											</div>
										</div>
										<a
											href="#"
											className="text-sm font-medium text-formColors-600 hover:underline dark:text-formColors-500"
										>
											Forgot password?
										</a>
									</div>
									{error && <div className="text-red-500">{error}</div>}
									<button
										type="submit"
										className="w-full text-white bg-formColors-600 hover:bg-formColors-700 focus:ring-4 focus:outline-none focus:ring-formColors-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-formColors-600 dark:hover:bg-formColors-700 dark:focus:ring-formColors-800"
									>
										Sign in
									</button>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400">
										Don’t have an account yet?{" "}
										<a
											href="#"
											className="font-medium text-formColors-600 hover:underline dark:text-formColors-500"
										>
											Sign up
										</a>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
