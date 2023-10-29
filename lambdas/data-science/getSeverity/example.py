event = {
    'group.id': {
          'answer.id': {
                    'value': answer.value,
                    'notes': answer.notes
                    }, 
          'answer.id': {
                    'value': answer.value,
                    'notes': answer.notes
                    }
            }
      }

example_event_allrna = {
    'fb91fdc7-46ba-47f8-bc3c-d1e480ad71be': {   # first RNA ID - can be the ONLY ONE
        '550e8400-e29b-41d4-a716-446655440000': {
            'value': False,
            'notes': 'There are no routes to the schools because some cars are blocking the way'
        },
        '550e8400-e29b-41d4-a716-446655440001': {
            'value': 'The elder leader says the community never used toilets and do not know the concept of sanitation',
            'notes': ''
        },
        '550e8400-e29b-41d4-a716-446655440002': {
            'value': True,
            'notes': ''
        }
    },
    'fb91fdc7-46ba-47f8-bc3c-d1e480ad71bf': {   # second RNA ID - this wont exist incase of 1 RNA
        'c7013a49-a854-4266-aa12-8de91f22ca31': {
            'value': True,
            'notes': ''
        },
        'c7013a49-a854-4266-aa12-8de91f22ca32': {
            'value': 'There are several other groups in the area like: NGA, VTYA, and the local government',
            'notes': ''
        },
        'c7013a49-a854-4266-aa12-8de91f22ca33': {
            'value': True,
            'notes': ''
        }
    }
}

example_event_categories = {
    'fb91fdc7-46ba-47f8-bc3c-d1e480ad71be': {   # first category ID - can be the ONLY ONE
        '550e8400-e29b-41d4-a716-446655440000': {
            'value': False,
            'notes': 'There are no routes to the schools because some cars are blocking the way'
        },
        '550e8400-e29b-41d4-a716-446655440001': {
            'value': 'The elder leader says the community never used toilets and do not know the concept of sanitation',
            'notes': ''
        },
        '550e8400-e29b-41d4-a716-446655440002': {
            'value': True,
            'notes': ''
        }
    },
    'fb91fdc7-46ba-47f8-bc3c-d1e480ad71bf': {   # second category ID - this wont exist incase of 1 category
        'c7013a49-a854-4266-aa12-8de91f22ca31': {
            'value': True,
            'notes': ''
        },
        'c7013a49-a854-4266-aa12-8de91f22ca32': {
            'value': 'There are several other groups in the area like: NGA, VTYA, and the local government',
            'notes': ''
        },
        'c7013a49-a854-4266-aa12-8de91f22ca33': {
            'value': True,
            'notes': ''
        }
    }
}

example_event_allrna_RETURN = {
                                'fb91fdc7-46ba-47f8-bc3c-d1e480ad71be': 100,
                                'fb91fdc7-46ba-47f8-bc3c-d1e480ad71bf': 100
                            }