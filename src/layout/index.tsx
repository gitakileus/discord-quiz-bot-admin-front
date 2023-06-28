import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { classNames } from "utils";

import { listsData, navigationData } from "./data";

interface Props {
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [lists, setLists] = useState<any[]>([]);
	const [navigation, setNavigation] = useState<any[]>([]);
	const location = useLocation();

	useEffect(() => {
		const updatedLists = listsData.map(list => {
			return {
				...list,
				current: location.pathname === list.href,
			};
		});
		const updatedNavigation = navigationData.map(list => {
			return {
				...list,
				current: location.pathname === list.href,
			};
		});

		setLists(updatedLists);
		setNavigation(updatedNavigation);
	}, [location]);

	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-900/80" />
						</Transition.Child>

						<div className="fixed inset-0 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
											<button
												type="button"
												className="-m-2.5 p-2.5"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
											</button>
										</div>
									</Transition.Child>
									{/* Sidebar component, swap this element with another sidebar if you like */}
									<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
										<div className="flex h-16 shrink-0 items-center">
											<img
												className="h-8 w-auto"
												src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
												alt="Your Company"
											/>
										</div>
										<nav className="flex flex-1 flex-col">
											<ul className="flex flex-1 flex-col gap-y-7">
												<li>
													<ul className="-mx-2 space-y-1">
														{navigation.map(item => (
															<li key={item.name}>
																<a
																	href={item.href}
																	className={classNames(
																		item.current
																			? "bg-gray-800 text-white"
																			: "text-gray-400 hover:bg-gray-800 hover:text-white",
																		"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
																	)}
																>
																	<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
																	{item.name}
																</a>
															</li>
														))}
													</ul>
												</li>
												<li>
													<div className="text-xs font-semibold leading-6 text-gray-400">
														Management
													</div>
													<ul className="-mx-2 mt-2 space-y-1">
														{lists.map(list => (
															<li key={list.name}>
																<a
																	href={list.href}
																	className={classNames(
																		list.current
																			? "bg-gray-800 text-white"
																			: "text-gray-400 hover:bg-gray-800 hover:text-white",
																		"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
																	)}
																>
																	<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
																		{list.initial}
																	</span>
																	<span className="truncate">{list.name}</span>
																</a>
															</li>
														))}
													</ul>
												</li>
											</ul>
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
						<div className="flex h-16 shrink-0 items-center">
							<img
								className="h-8 w-auto"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
								alt="Your Company"
							/>
						</div>
						<nav className="flex flex-1 flex-col">
							<ul className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul className="-mx-2 space-y-1">
										{navigation.map(item => (
											<li key={item.name}>
												<a
													href={item.href}
													className={classNames(
														item.current
															? "bg-gray-800 text-white"
															: "text-gray-400 hover:bg-gray-800 hover:text-white",
														"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
													)}
												>
													<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</li>
								<li>
									<div className="text-xs font-semibold leading-6 text-gray-400">Management</div>
									<ul className="-mx-2 mt-2 space-y-1">
										{lists.map(list => (
											<li key={list.name}>
												<a
													href={list.href}
													className={classNames(
														list.current
															? "bg-gray-800 text-white"
															: "text-gray-400 hover:bg-gray-800 hover:text-white",
														"group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
													)}
												>
													<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
														{list.initial}
													</span>
													<span className="truncate">{list.name}</span>
												</a>
											</li>
										))}
									</ul>
								</li>
								<li className="-mx-6 mt-auto">
									<a
										href="/"
										className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
									>
										<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
											A
										</span>
										<span aria-hidden="true">Admin</span>
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
					<button
						type="button"
						className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
					<div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
					<a href="/">
						<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
							A
						</span>
						<span aria-hidden="true">Admin</span>
					</a>
				</div>

				<main className="py-10 lg:pl-72">
					<div className="px-4 sm:px-6 lg:px-8">{children}</div>
				</main>
			</div>
		</>
	);
};

export default Layout;
