// react library
import React from 'react';

// react-native library
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';

// third-party libraries
import firebase from "firebase";
import { Card, Button, Icon } from 'react-native-elements';
import { LiteCreditCardInput } from "react-native-credit-card-input";
import RNPaystack from 'react-native-paystack';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-simple-modal';
import Toast from 'react-native-simple-toast';

// common
import { StatusBarComponent, ButtonTextComponent, Input } from "../common";

class WalletHomepage extends React.Component {
	
	state={
		verifiedUser: false,
		returnFromBackend: false,
		paymentMethod: '',
		loading: true,
		toggleAmountModal: false,
		transactionType: '',
		amountErrorMessage: '',
		amount: '',
		email: '',
		toggleCardPayment: false,
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvc: '',
		paymentStatus: false,
		paymentStatusModal: false,
		paymentError: '',
		toggleEmailTransfer: false,
		receiverEmail: ''
	};
	
	/**
	 * componentDidMount
	 *
	 * React life cycle method
	 * @return {void}
	 */
	componentDidMount() {
		if (firebase.apps.length === 0) {
			firebase.initializeApp({
				apiKey: "AIzaSyD0ZJS7tPUrOWkZEZQRXDLQfLRT2yxhKMM",
				authDomain: "moov-68c37.firebaseapp.com",
				databaseURL: "https://moov-68c37.firebaseio.com",
				projectId: "moov-68c37",
				storageBucket: "moov-68c37.appspot.com",
				messagingSenderId: "1050975255216"
			});
		}
		this.isVerified();
	}
	
	/**
	 * isVerified
	 *
	 * Check if user's email is verified
	 * @return {void}
	 */
	isVerified = () => {
		const { navigate } = this.props.navigation;
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ verifiedUser: true,  email: user.email, loading: false})
			} else {
				this.setState({ loading: false })
				navigate('LandingPage');
			}
		});
	};
	
	/**
	 * chargeCard
	 *
	 * Charges user card with card parameters supplied
	 * @return {void}
	 */
	chargeCard() {
		this.setState({ loading: !this.state.loading })
		RNPaystack.chargeCard({
			cardNumber: this.state.cardNumber,
			expiryMonth: this.state.expiryMonth,
			expiryYear: this.state.expiryYear,
			cvc: this.state.cvc,
			email: this.state.email,
			amountInKobo: this.state.amount,
		})
			.then(response => {
				console.log(response); // card charged successfully, get reference here
				this.setState({
					paymentStatus: true,
					paymentStatusModal: true
				});
				this.sendTokenToServer(response);
				this.setState({ loading: !this.state.loading, cardTransaction: 'success' })
			})
			.catch(error => {
				console.log(error); // error is a javascript Error object
				console.log(error.message);
				console.log(error.code);
				this.setState({
					paymentStatusModal: true
				});
				this.setState({ loading: !this.state.loading, paymentError: error.message })
			})
		
	}
	
	/**
	 * resetComponent
	 *
	 * resets component to it's initial state
	 */
	resetComponent = () => {
		this.setState({
			toggleCardPayment: false,
			toggleAmountModal: false,
			cardNumber: '',
			expiryMonth: '',
			expiryYear: '',
			cvc: '',
		})
	}
	
	/**
	 * sendTokenToServer
	 *
	 * Saves user token to the server for recurring debit
	 * @param {number} token - user token from paystack
	 * @return {void}
	 */
	sendTokenToServer = (token) => {
		console.log(`Sending... ${token.reference} to server...`);
	};
	
	
	/**
	 * verifyAmount
	 *
	 * Ask user to verify the amount value and sets state of the show modal
	 * @return {void}
	 */
	verifyAmount = () => {
		if(this.state.amount.length >= 3) {
			if (!this.state.amount.match(/[a-z]/i) && /^[a-zA-Z0-9- ]*$/.test(this.state.amount) === true && this.state.amount.length >= 3) {
				this.setState({ showModal: true })
			} else {
				Toast.showWithGravity(
					`Amount should contain only numbers`,
					Toast.LONG,
					Toast.TOP,
				);
			}
		} else {
			Toast.showWithGravity(
				`Amount should be 3 digits or more`,
				Toast.LONG,
				Toast.TOP,
			);
		}
	};
	
	/**
	 * convertAmountToKobo
	 *
	 * Converts the current amount in naira to kobo
	 * @return {void}
	 */
	convertAmountToKobo = () => {
		this.setState({ confirmAmount: true });
		let amount;
		amount = this.state.amount * 100;
		this.setState({ amount: amount, toggleAmountModal: false });
		
		console.log(this.state.paymentMethod);
		
		if(this.state.paymentMethod === 'server') {
			this.chargeFromServer()
		}
		
		if(this.state.paymentMethod === 'card') {
			console.log('charging card');
			this.setState({ toggleCardPayment: true })
		}
		
		if(this.state.transactionType === "TRANSFER") {
			this.setState({ toggleEmailTransfer: true })
		}
		
	};
	
	/**
	 * validateEmail
	 *
	 * validates transfer email
	 * @param email
	 * @returns {boolean}
	 */
	validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	
	/**
	 * transferToEmail
	 *
	 * transfers money from user's wallet to another user via email
	 */
	transferToEmail = () => {
		console.log(this.validateEmail(this.state.receiverEmail), 'Is it');
		if(this.validateEmail(this.state.receiverEmail)) {
			if(this.state.email !== this.state.receiverEmail) {
				Toast.showWithGravity(
					`Transfering ${this.state.amount} from ${this.state.email} to ${this.state.receiverEmail}`,
					Toast.LONG,
					Toast.TOP,
				);
			} else if(this.state.email === this.state.receiverEmail) {
				Toast.showWithGravity(
					`You cannot transfer to yourself`,
					Toast.LONG,
					Toast.TOP,
				);
			}
		} else {
			Toast.showWithGravity(
				`Email is badly formatted`,
				Toast.LONG,
				Toast.TOP,
			);
		}
	};
	
	/**
	 * checkAuthCodeStatus
	 *
	 * Queries the server for authorization code and sets state of payment method
	 * @return {void}
	 */
	checkAuthCodeStatus = () => {
		if (this.state.returnFromBackend) {
			this.setState({ loading: false, toggleAmountModal: true });
			this.setState({ paymentMethod: 'server'});
		} else if (this.state.returnFromBackend === false){
			this.setState({ paymentMethod: 'card'});
			this.setState({ loading: false, toggleAmountModal: true });
		}
	};
	
	/**
	 * changeTrasactionTypeStatus
	 *
	 * Changes the state of the trasactionTypeStatus
	 */
	verifySelection = () => {
		if (this.state.transactionType === 'LOAD') {
			this.setState({ loading: true });
			this.checkAuthCodeStatus();
		} else if (this.state.transactionType === 'TRANSFER') {
				this.setState({ loading: false, toggleAmountModal: true });
		}
		else {
			Toast.showWithGravity(
				`Please select a valid transaction type`,
				Toast.LONG,
				Toast.TOP,
			);
		}
	};
	
	
	/**
	 * chargeFromServer
	 *
	 * charges user from server
	 * @return {void}
	 */
	chargeFromServer = () => {
		console.log(`charging user ${this.state.email} charge: ${this.state.amount}`)
	};
	
	/**
	 * _onChange
	 *
	 * Sets states of card parameters and error messages
	 * @param {object} form - contains user card details
	 * @return {void}
	 */
	_onChange = (form) => {
		if(form.status.number === 'valid' && form.status.expiry === 'valid' && form.status.cvc === 'valid') {
			this.setState({
				cardNumber: form.values.number,
				expiryMonth: form.values.expiry.substring(0, 2),
				expiryYear: form.values.expiry.substring(3, 5),
				cvc: form.values.cvc,
			})
		} else {
			this.setState({
				errorMessage:
					`Card Number is ${form.status.number}, Expiry Date is ${form.status.expiry} and CVC is ${form.status.expiry}`
			})
		}
	};
	
	/**
	 * onSubmit
	 *
	 * Submits the card parameters for to the chargeCard function
	 * @return {void}
	 */
	onSubmit = () => {
		if ( this.state.cardNumber !== '') {
			this.chargeCard()
		} else {
			Toast.showWithGravity(
				`${this.state.errorMessage}`,
				Toast.LONG,
				Toast.TOP,
			);
		}
	};
	
	
	
	render() {
		const { container, activityIndicator } = styles;
		let { height, width } = Dimensions.get('window');
		
		
		let data = [{ value: 'LOAD', }, { value: 'TRANSFER', }];
		
		if(this.state.toggleEmailTransfer) {
			return (
				<View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<View style={{ width: '90%'}}>
						<Input
							style={{ zIndex: -1 }}
							onChangeText={receiverEmail => this.setState({ receiverEmail })}
							value={this.state.receiverEmail}
							autoFocus
							errorMessage={this.amountErrorMessage}
							keyboardType='email-address'
							placeholder="Enter receiver's email"
							label='Amount'
						/>
						<ButtonTextComponent
							onPress={this.transferToEmail}
							buttonText='TRANSFER'
							iconName='send'
							iconType='material'
							backgroundColor='#004a80'
						/>
					</View>
				</View>
			);
		}
		
		if (this.state.loading) {
			return (
				<View style={{flex: 1}}>
					<ActivityIndicator
						color = '#004a80'
						size = "large"
						style={activityIndicator}
					/>
				</View>
			);
		}
		
		if(this.state.toggleCardPayment) {
			return (
				<View style={container}>
					<StatusBarComponent />
					<Modal
						offset={this.state.offset}
						open={this.state.paymentStatusModal}
						modalDidOpen={() => console.log('modal did open')}
						modalDidClose={() => {
							if(this.state.cardTransaction === 'success') {
								// this.setState({paymentStatusModal: false, transactionTypeStatus: false, amount: '' })
								this.resetComponent();
							} else  {
								this.setState({paymentStatusModal: false })
							}
						}}
						modalStyle={{
							borderRadius: 2,
							marginLeft: 20,
							height: height / 4,
							backgroundColor: '#F5F5F5'
						}}
						style={{alignItems: 'center'}}>
						<View>
							<TouchableOpacity>
								{
									(this.state.paymentStatus) ?
										<View>
											<TouchableOpacity
												onPress={() => this.setState({paymentStatusModal: false, transactionTypeStatus: false })}
											>
												<Text style={{fontSize: 20, marginBottom: 10, alignItems: 'center'}}>
													Transaction was successful
												</Text>
												<Icon
													size={100}
													name='checkbox-marked-circle'
													type='material-community'
													color='#4caf4f'
												/>
											</TouchableOpacity>
										</View>
										:
										(this.state.paymentStatus === false) ?
											<View>
												<Text style={{fontSize: 20, marginBottom: 10, alignItems: 'center'}}>
													Transaction Failed! {this.state.paymentError}
												</Text>
												<Icon
													size={100}
													name='cancel'
													color='#a84441'
												/>
											</View>
											: <Text/>
								}
							</TouchableOpacity>
						</View>
					</Modal>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: -1}}>
						<Text style={{ color: '#004a80', alignItems: 'center'}}>ENTER CARD DETAILS</Text>
						<View style={{ height: height/ 7, width: width / 1 }}>
							<LiteCreditCardInput
								autoFocus
								onChange={this._onChange}
								returnKeyType="next"
							/>
							<ButtonTextComponent
								onPress={this.onSubmit}
								iconName='wallet'
								iconType='simple-line-icon'
								buttonText='LOAD'
								backgroundColor='#004a80'
							/>
						</View>
					</View>
				</View>
			);
		}
		
		if(this.state.toggleAmountModal) {
			return (
				<View style={{ backgroundColor: '#fff', height: height, paddingTop: height / 10}}>
					<Modal
						offset={this.state.offset}
						open={this.state.showModal}
						containerStyle={{
							marginBottom: height / 2,
						}}
						modalStyle={{
							borderRadius: 2,
							marginLeft: 20,
							height: height / 4,
							backgroundColor: '#F5F5F5'
						}}
						modalDidOpen={() => console.log('modal did open')}
						modalDidClose={() => this.setState({showModal: false})}
						style={{alignItems: 'center', height: height / 100, offset: -100}}>
						
						<View>
							<Text style={{fontSize: 20, marginBottom: 10}}>Confirm ?</Text>
							<Text style={{ fontWeight: '700' }}>Amount: {this.state.amount}</Text>
							<Text style={{ fontWeight: '700' }}> </Text>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
								<TouchableOpacity>
									<View style={{ zIndex: -1 }}>
										<ButtonTextComponent
											onPress={this.convertAmountToKobo}
											buttonText='YES'
											iconName='ios-checkmark-circle-outline'
											iconType='ionicon'
											backgroundColor='#004a80'
										/>
									</View>
								</TouchableOpacity>
								<TouchableOpacity>
									<View style={{ zIndex: -1 }}>
										<ButtonTextComponent
											onPress={() => this.setState({showModal: false})}
											buttonText='NO'
											iconName='cancel'
											iconType='material'
											backgroundColor='#a84441'
										/>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
					<StatusBarComponent />
					<View style={{ zIndex: -1 }}>
						<Input
							style={{ zIndex: -1 }}
							onChangeText={amount => this.setState({ amount: amount.replace(" ", "") })}
							value={this.state.amount}
							autoFocus
							errorMessage={this.amountErrorMessage}
							keyboardType='numeric'
							placeholder='Enter amount in naira'
							label='Amount'
						/>
					</View>
					<View style={{ zIndex: -1 }}>
						<ButtonTextComponent
							onPress={this.verifyAmount}
							buttonText='NEXT'
							iconName='navigate-next'
							iconType='material'
							backgroundColor='#004a80'
						/>
					</View>
				</View>
			)
		}
		
		if(this.state.verifiedUser) {
			return (
				<View style={{ backgroundColor: '#fff', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<View style={{ width: '90%'}}>
						<Dropdown
							label='Transaction type'
							data={data}
							value={this.state.transactionType}
							onChangeText={transactionType => this.setState({ transactionType })}
						/>
						<ButtonTextComponent
							onPress={this.verifySelection}
							buttonText='NEXT'
							iconName='navigate-next'
							iconType='material'
							backgroundColor='#004a80'
						/>
					</View>
				</View>
			);
		}
		
		return (
			<View style={container}>
				<StatusBarComponent />
				<Text>Wallet Page</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 200
	},
});

export { WalletHomepage };