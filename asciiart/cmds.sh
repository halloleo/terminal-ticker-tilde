pipenv install -r requirements.txt

# Generate the tilde acii art

pipenv run python ascii_image.py -v -r 40 -f math-tilde.png >math-tilde_small.ascii
pipenv run python ascii_image.py -v -r 60 -f math-tilde.png >math-tilde_medium.ascii
pipenv run python ascii_image.py -v -r 80 -f math-tilde.png >math-tilde_large.ascii

# The output files math-tilde_<small|medium|large>.png are used in site/tilde_<small|medium|large>.txt
