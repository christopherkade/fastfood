import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { HorizontalBar } from "react-chartjs-2"

import "./CompareModal.css"
import { Button } from "../Button"

const Title = styled.h1`
  font-size: 2rem;
`

/**
 * Sort and clean the food array
 * @param {*} foodCount
 */
const extractDataFromFood = (foodCount) => {
  const labels = []

  const datasets = [
    {
      label: 'Food choices',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
  ]

  const keys = Object.keys(foodCount)

  keys.map(key => {
    if (key === "") return null

    const { name, emoji } = foodCount[key].obj
    return {
      name,
      emoji,
      count: foodCount[key].count
    }
  })
    .filter(food => food)
    .sort((a, b) => a.count - b.count)
    .reverse()
    .forEach(({ name, emoji, count }) => {
      labels.push(emoji)
      datasets[0].data.push(count)
    })

  return {
    labels,
    datasets
  }
}

const CompareModal = ({ count, onClick }) => {
  let foodData = extractDataFromFood(count)

  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }],
      yAxes: [{
        ticks: {
          fontSize: 30
        }
      }]
    }
  }


  return (
    <details-dialog>
      <Title>Vote count</Title>
      <HorizontalBar
        data={foodData}
        options={options}
      />
      <Button onClick={onClick}>Close</Button>
    </details-dialog>
  )
}

CompareModal.propTypes = {
  count: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}

CompareModal.defaultProps = {
  count: {},
}

export default CompareModal
