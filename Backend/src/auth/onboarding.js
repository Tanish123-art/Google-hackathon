import User from '../models/user.js';

export const onboarding = async (req, res) => {
  const { careerPath, skills, interests } = req.body;
  const userId = req.user.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.careerPath = careerPath;
    user.skills = skills;
    user.interests = interests;
    user.onboardingComplete = true;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

