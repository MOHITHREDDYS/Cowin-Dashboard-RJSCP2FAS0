// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {vaccineData: {}, apiStatus: apiStatusList.initial}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDetails => ({
          dose1: eachDetails.dose_1,
          dose2: eachDetails.dose_2,
          vaccineDate: eachDetails.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      return this.setState({
        vaccineData: formattedData,
        apiStatus: apiStatusList.success,
      })
    }
    return this.setState({apiStatus: apiStatusList.failure})
  }

  renderLoadingView = () => (
    <div testid="loader" className="spinner-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {vaccineData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccineData
    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  displayView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderSuccessView()
      case apiStatusList.loading:
        return this.renderLoadingView()
      case apiStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-main-container">
        <div className="cowin-container">
          <div className="logo-name-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="cowin-logo-image"
            />
            <h1 className="cowin-logo-name">Co-WIN</h1>
          </div>
          <h1 className="cowin-heading">CoWIN Vaccination in India</h1>
          {this.displayView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
