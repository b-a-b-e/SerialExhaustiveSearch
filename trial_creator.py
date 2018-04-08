import numpy as np

def random_trial():
    length = np.random.randint(1, high = 7)
    sequence = list(np.random.choice([i for i in range(10)], size = length, replace=False))
    return sequence

def set_probe(trial):
    present = np.random.choice([True, False])
    if present:
        probe = np.random.choice(trial)
        trial_type = 'present'
    else:
        probe = np.random.choice(list(set([0,1,2,3,4,5,6,7,8,9]) - set(trial)))
        trial_type = 'absent'
    return probe, trial_type

def make_trials(number):
    seq = [random_trial() for i in range(number)]
    trials = []
    for i in seq:
        probe, trial_type = set_probe(i)
        trials.append({'stimulus': i, 'probe': probe, 'trial_type': trial_type})
    return trials
