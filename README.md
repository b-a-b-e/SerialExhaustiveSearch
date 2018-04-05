# SerialExhaustiveSearch
Implementation of SES experiment

Experiment structure
---
- instructions
- practice trial x 24
- main trial x 144

Trial structure
---
- presentation of sequence stimuli (display each digit for 1.2s)
- presentaiton of test digit (either in sequence or not) (after 2s delay)
- record response

Response
---
'k' = test digit in sequence

'd' = test digit not in sequence

Data to record
---
correctness (combination of response and trial-type)

trial type (test digit *present* or *absent*)

reaction time (from display of test digit to response keypress)

position of test digit in sequence
