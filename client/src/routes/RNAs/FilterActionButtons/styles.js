const button = isActive => ({
    width: '150px',
    backgroundColor: isActive ? 'blue' : 'white',
    color: 'black',
    padding: '12px 24px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '16px'
  });  

  const container = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '16px',
    padding: '12px'
  };

  export const styles = {button, container}