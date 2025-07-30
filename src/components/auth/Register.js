// src/components/auth/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // טופס משתמש וסיסמה
  const [formData, setFormData] = useState({
    // מידע התחברות
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // מידע עובד
    workingHours: 6,           // ברירת מחדל: 6 שעות
    leadType: 'firstLead',     // ברירת מחדל: מהליד הראשון
    
    // מידע אישי
    taxCredits: 2.25,          // נקודות זיכוי ברירת מחדל
    sickDaysBalance: 0,        // ימי מחלה
    vacationDaysBalance: 0,    // ימי חופשה
    
    // תוכנית חודשית
    monthlyLeadGoal: 0,        // יעד לידים חודשי
    overtimeHours: 0,          // שעות נוספות
    overtimeDaysPerWeek: 0,    // ימים עם שעות נוספות בשבוע
    
    // העדפות
    darkMode: false,           // ברירת מחדל: מצב רגיל (לא כהה)
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const nextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('הסיסמאות אינן תואמות');
    }
    
    try {
      setError('');
      setLoading(true);
      
      // שליחת נתונים לרכיב ההתחברות לשם הרשמה
      await signup(formData.email, formData.password, {
        username: formData.username,
        workingHours: parseInt(formData.workingHours),
        leadType: formData.leadType,
        taxCredits: parseFloat(formData.taxCredits),
        sickDaysBalance: parseInt(formData.sickDaysBalance),
        vacationDaysBalance: parseInt(formData.vacationDaysBalance),
        monthlyLeadGoal: parseInt(formData.monthlyLeadGoal),
        overtimeHours: parseInt(formData.overtimeHours),
        overtimeDaysPerWeek: parseInt(formData.overtimeDaysPerWeek),
        darkMode: formData.darkMode,
        // יצירת אובייקט בסיסי של המטרות החודשיות
        monthlyPlans: {
          [new Date().toISOString().slice(0, 7)]: {  // חודש נוכחי
            dailyLeadGoal: parseInt(formData.monthlyLeadGoal) / 22,  // יעד יומי לפי 22 ימי עבודה בחודש
            overtimeHours: parseInt(formData.overtimeHours),
            overtimeDaysPerWeek: parseInt(formData.overtimeDaysPerWeek)
          }
        }
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error("שגיאת הרשמה:", error);
      setError('ההרשמה נכשלה: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // שלבים בתהליך ההרשמה
  const steps = ['פרטי התחברות', 'מידע עובד', 'מידע אישי', 'תוכנית חודשית', 'העדפות'];

  // תוכן כל שלב בהרשמה
  const getStepContent = (step) => {
    switch (step) {
      case 0: // פרטי התחברות
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="שם משתמש"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="סיסמה"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="אימות סיסמה"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </>
        );
      case 1: // מידע עובד
        return (
          <>
            <FormControl fullWidth margin="normal">
              <InputLabel id="workingHours-label">שעות עבודה</InputLabel>
              <Select
                labelId="workingHours-label"
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                label="שעות עבודה"
                onChange={handleChange}
              >
                <MenuItem value={6}>6 שעות</MenuItem>
                <MenuItem value={7}>7 שעות</MenuItem>
                <MenuItem value={8}>8 שעות</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="leadType-label">סוג מטייבת</InputLabel>
              <Select
                labelId="leadType-label"
                id="leadType"
                name="leadType"
                value={formData.leadType}
                label="סוג מטייבת"
                onChange={handleChange}
              >
                <MenuItem value="firstLead">מהליד הראשון</MenuItem>
                <MenuItem value="tenthLeadRetro">מהליד העשירי רטרו</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 2: // מידע אישי
        return (
          <>
            <TextField
              margin="normal"
              fullWidth
              id="taxCredits"
              label="נקודות זיכוי"
              name="taxCredits"
              type="number"
              value={formData.taxCredits}
              onChange={handleChange}
              inputProps={{ step: 0.25, min: 0 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="sickDaysBalance"
              label="יתרת ימי מחלה"
              name="sickDaysBalance"
              type="number"
              value={formData.sickDaysBalance}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="vacationDaysBalance"
              label="יתרת ימי חופשה"
              name="vacationDaysBalance"
              type="number"
              value={formData.vacationDaysBalance}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </>
        );
      case 3: // תוכנית חודשית
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              תוכנית לחודש {new Date().toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
            </Typography>
            <TextField
              margin="normal"
              fullWidth
              id="monthlyLeadGoal"
              label="יעד לידים חודשי"
              name="monthlyLeadGoal"
              type="number"
              value={formData.monthlyLeadGoal}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="overtimeHours"
              label="שעות נוספות (בכל פעם)"
              name="overtimeHours"
              type="number"
              value={formData.overtimeHours}
              onChange={handleChange}
              inputProps={{ min: 0, max: 4 }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="overtimeDaysPerWeek"
              label="ימים עם שעות נוספות בשבוע"
              name="overtimeDaysPerWeek"
              type="number"
              value={formData.overtimeDaysPerWeek}
              onChange={handleChange}
              inputProps={{ min: 0, max: 5 }}
            />
          </>
        );
      case 4: // העדפות
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel id="darkMode-label">מצב תצוגה</InputLabel>
            <Select
              labelId="darkMode-label"
              id="darkMode"
              name="darkMode"
              value={formData.darkMode}
              label="מצב תצוגה"
              onChange={handleChange}
            >
              <MenuItem value={false}>תצוגה רגילה</MenuItem>
              <MenuItem value={true}>תצוגה כהה</MenuItem>
            </Select>
          </FormControl>
        );
      default:
        return 'שלב לא ידוע';
    }
  };

  return (
    <Container component="main" maxWidth="md" dir="rtl">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            הרשמה
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ width: '100%', mt: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
          
          <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
            {getStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={prevStep}
              >
                הקודם
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  הירשם
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={nextStep}
                >
                  הבא
                </Button>
              )}
            </Box>
            
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link to="/login" variant="body2">
                  כבר יש לך חשבון? התחבר
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}