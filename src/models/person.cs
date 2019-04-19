using FluentValidation;

    namespace FValidation
    {
        public class PersonValidator : AbstractValidator<Person>
        {
            public PersonValidator()
            {
              RuleFor(x => x.FirstName).NotEmpty().MinimumLength(5).MaximumLength(10).WithName("First Name");
            RuleFor(x => x.LastName).MinimumLength(10).MaximumLength(20).WithName("Last Name");
            RuleFor(x => x.Age).NotEmpty().GreaterThan(18).LessThan(60).WithName("Age");
            RuleFor(x => x.Birthday).NotEmpty().WithName("Birthday");
            }
    
        }
    }    
