from GPbot.parsing import parseit


def test_parseIt():
    test_var = "Parle moi d'Openclassrooms papy!"
    assert parseIt(test_var) == "Openclassrooms"
